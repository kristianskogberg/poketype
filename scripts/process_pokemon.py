import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
POKEMON_JSON = os.path.join(SCRIPT_DIR, '..', 'assets', 'utils', 'pokemon.json')

# Special name corrections applied to speciesName (display name)
NAME_CORRECTIONS = {
    'nidoran-f': 'Nidoran ♀',
    'nidoran-m': 'Nidoran ♂',
    'farfetchd': "Farfetch'd",
    'mr-mime': 'Mr. Mime',
    'porygon-z': 'Porygon-Z',
    'type-null': 'Type: Null',
    'ho-oh': 'Ho-Oh',
    'wo-chien': 'Wo-Chien',
    'chien-pao': 'Chien-Pao',
    'ting-lu': 'Ting-Lu',
    'chi-yu': 'Chi-Yu',
    'mr-rime': 'Mr. Rime',
    'mime-jr': 'Mime Jr.',
    'tapu-koko': 'Tapu Koko',
    'tapu-lele': 'Tapu Lele',
    'tapu-bulu': 'Tapu Bulu',
    'tapu-fini': 'Tapu Fini',
    'jangmo-o': 'Jangmo-o',
    'hakamo-o': 'Hakamo-o',
    'kommo-o': 'Kommo-o',
}

# Known special form keywords that get mapped to specific labels
KNOWN_FORMS = {
    'mega': 'Mega',
    'gmax': 'G-Max',
    'galar': 'Galarian',
    'alola': 'Alolan',
    'hisui': 'Hisuian',
    'paldea': 'Paldean',
}

# Tokens that are part of a known form and should not become custom forms
KNOWN_FORM_EXTRAS = {'x', 'y', 'z'}

# Gender tokens to skip (not forms)
GENDER_TOKENS = {'male', 'female'}

# Pokemon names to exclude entirely (duplicates of other forms)
EXCLUDE_NAMES = {
    'zygarde-10-power-construct',
    'zygarde-50-power-construct',
}

# Special form token overrides per species
# Maps (speciesName, token) -> replacement string or None to skip
SPECIES_TOKEN_OVERRIDES = {
    ('zygarde', '10'): '10%',
    ('zygarde', '50'): '50%',
    ('zygarde', 'complete'): 'Complete',
}


def capitalize_name(name):
    """Capitalize first letter of each hyphen-separated word."""
    return '-'.join(word[0].upper() + word[1:] for word in name.split('-') if word)


def capitalize_form(tokens):
    """Capitalize a list of tokens into a form name joined by spaces."""
    return ' '.join(word[0].upper() + word[1:] for word in tokens if word)


def get_forms(name, species_name):
    """Extract form labels as an array from the name suffix.

    Returns an array like ["Galarian"], ["Mega", "X"], ["Paldean", "Combat Breed"],
    or ["G-Max", "Low Key"], etc. Returns None if no forms found.
    """
    if name == species_name:
        return None

    suffix = name[len(species_name) + 1:]
    tokens = suffix.split('-')

    forms = []
    custom_tokens = []
    i = 0

    while i < len(tokens):
        token = tokens[i]

        # Skip gender tokens
        if token in GENDER_TOKENS:
            i += 1
            continue

        # Check for species-specific token overrides
        override_key = (species_name, token)
        if override_key in SPECIES_TOKEN_OVERRIDES:
            forms.append(SPECIES_TOKEN_OVERRIDES[override_key])
            i += 1
            continue

        # Check for known forms
        if token in KNOWN_FORMS:
            label = KNOWN_FORMS[token]
            # For mega, check if next token is x/y/z (Mega X, Mega Y)
            if token == 'mega' and i + 1 < len(tokens) and tokens[i + 1] in KNOWN_FORM_EXTRAS:
                forms.append(f"{label} {tokens[i + 1].upper()}")
                i += 2
            else:
                forms.append(label)
                i += 1
            continue

        # Everything else is part of the custom form
        custom_tokens.append(token)
        i += 1

    if custom_tokens:
        forms.append(capitalize_form(custom_tokens))

    return forms if forms else None


def get_display_name(species_name):
    """Get the corrected, capitalized display name."""
    if species_name in NAME_CORRECTIONS:
        return NAME_CORRECTIONS[species_name]
    return capitalize_name(species_name)


def main():
    with open(POKEMON_JSON, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Filter out excluded pokemon
    data['results'] = [p for p in data['results'] if p['name'] not in EXCLUDE_NAMES]

    for pokemon in data['results']:
        species = pokemon['speciesName']
        name = pokemon['name']

        # Add capitalized display name
        pokemon['displayName'] = get_display_name(species)

        # Remove old single form property if it exists
        pokemon.pop('form', None)

        # Remove old forms to recompute
        pokemon.pop('forms', None)

        # Add forms array
        forms = get_forms(name, species)
        if forms:
            pokemon['forms'] = forms

    with open(POKEMON_JSON, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Processed {len(data['results'])} pokemon entries.")


if __name__ == '__main__':
    main()
