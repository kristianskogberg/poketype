"""
Scrape PokeAPI to build a local pokemon.json with all needed data.

Usage: python scripts/scrape_pokemon.py

Outputs: assets/utils/pokemon.json
"""

import json
import time
import os
import requests

API_BASE = "https://pokeapi.co/api/v2"
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), "..", "assets", "utils", "pokemon.json")

# Fetch full pokemon list
print("Fetching pokemon list...")
pokemon_list = []
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
        # Fetch pokemon data
        poke_resp = requests.get(pokemon_url)
        poke_resp.raise_for_status()
        poke_data = poke_resp.json()

        # Fetch species data for pokedex number
        species_url = poke_data["species"]["url"]
        species_resp = requests.get(species_url)
        species_resp.raise_for_status()
        species_data = species_resp.json()

        image = poke_data["sprites"]["other"]["official-artwork"]["front_default"]
        pokemon_name = poke_data["species"]["name"]
        types = [t["type"]["name"] for t in poke_data["types"]]
        pokedex_number = species_data["pokedex_numbers"][0]["entry_number"]

        results.append({
            "name": pokemon_name,
            "image": image,
            "types": types,
            "pokedexNumber": pokedex_number,
        })

        print(f"[{i + 1}/{len(entries)}] {pokemon_name} - #{pokedex_number} - {types}")

    except Exception as e:
        print(f"[{i + 1}/{len(entries)}] FAILED {name}: {e}")
        failed.append({"name": name, "url": pokemon_url, "error": str(e)})

    # Be nice to the API
    time.sleep(0.5)

# Sort by pokedex number, then by name for same number (variants)
results.sort(key=lambda p: (p["pokedexNumber"], p["name"]))

output = {"results": results}

with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"\nDone! Wrote {len(results)} pokemon to {OUTPUT_PATH}")
if failed:
    print(f"Failed: {len(failed)} entries:")
    for f_entry in failed:
        print(f"  - {f_entry['name']}: {f_entry['error']}")
