"""
Scrape PokeAPI to build a local pokemon.json with all needed data.
Uses only the /pokemon/ endpoint — no species endpoint needed.

Usage: python scripts/scrape_pokemon.py

Outputs: assets/utils/pokemon.json
"""

import json
import re
import time
import os
import requests

API_BASE = "https://pokeapi.co/api/v2"
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "assets", "utils", "pokemon.json")

def get_id_from_url(url):
    """Extract numeric ID from a PokeAPI URL like .../pokemon/479/"""
    match = re.search(r"/(\d+)/?$", url)
    return int(match.group(1)) if match else None



# Fetch full pokemon list
print("Fetching pokemon list...")
url = f"{API_BASE}/pokemon?limit=10000"
resp = requests.get(url)
resp.raise_for_status()
entries = resp.json()["results"]
print(f"Found {len(entries)} pokemon")

results = []
failed = []

for i, entry in enumerate(entries):
    name = entry["name"]
    pokemon_url = entry["url"]

    try:
        poke_resp = requests.get(pokemon_url)
        poke_resp.raise_for_status()
        poke_data = poke_resp.json()

        pokemon_id = poke_data["id"]
        species_name = poke_data["species"]["name"]
        pokedex_number = get_id_from_url(poke_data["species"]["url"])
        types = [t["type"]["name"] for t in poke_data["types"]]
        is_default = poke_data.get("is_default", True)

        # typeOverrides: only included when a pokemon's type changed across gens
        # means "up to and including this generation, types were X"
        type_overrides = []
        for pt in poke_data.get("past_types", []):
            type_overrides.append({
                "generation": pt["generation"]["name"],
                "types": [t["type"]["name"] for t in pt["types"]],
            })

        entry = {
            "id": pokemon_id,
            "name": name,
            "speciesName": species_name,
            "types": types,
            "pokedexNumber": pokedex_number,
            "isDefault": is_default,
        }

        # Only include typeOverrides if there are any (keeps JSON small)
        if type_overrides:
            entry["typeOverrides"] = type_overrides

        results.append(entry)

        form_tag = "" if is_default else " (form)"
        override_info = f" overrides:{type_overrides}" if type_overrides else ""
        print(f"[{i + 1}/{len(entries)}] #{pokedex_number} {name} - {types}{form_tag}{override_info}")

    except Exception as e:
        print(f"[{i + 1}/{len(entries)}] FAILED {name}: {e}")
        failed.append({"name": name, "url": pokemon_url, "error": str(e)})

    # Be nice to the API
    time.sleep(0.5)

# Sort: by pokedex number, default forms first, then alphabetically
results.sort(key=lambda p: (p["pokedexNumber"], not p["isDefault"], p["name"]))

output = {"results": results}

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"\nDone! Wrote {len(results)} pokemon to {OUTPUT_PATH}")
if failed:
    print(f"Failed: {len(failed)} entries:")
    for f_entry in failed:
        print(f"  - {f_entry['name']}: {f_entry['error']}")
