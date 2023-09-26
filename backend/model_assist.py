import os
import json

def json_loader(directory):
    json_data = []

    # Loop through files in the directory
    for filename in os.listdir(directory):
        # Check if the file has a .json extension
        if filename.endswith(".json"):
            file_path = os.path.join(directory, filename)
            
            # Open and load the JSON file
            try:
                with open(file_path, "r") as json_file:
                    print(f'Successfully read: {file_path}')
                    data = json.load(json_file)
                    json_data.append(json.dumps(data, indent=4))  # Convert to a formatted JSON string
            except Exception as e:
                print(f"Error loading '{filename}': {str(e)}")

    return json_data
