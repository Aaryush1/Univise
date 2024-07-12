import requests
import json

API_TOKEN = 'c4ca41ba22524efab3d3bc9531cf8860'
BASE_URL = 'https://api.madgrades.com/v1'

def get_courses(query):
    headers = {'Authorization': f'Token token={API_TOKEN}'}
    params = {'query': query}
    response = requests.get(f'{BASE_URL}/courses', headers=headers, params=params)
    return response.json()

def get_course_grades(course_uuid):
    headers = {'Authorization': f'Token token={API_TOKEN}'}
    response = requests.get(f'{BASE_URL}/courses/{course_uuid}/grades', headers=headers)
    return response.json()

def process_courses(courses_data):
    results = []

    for course_data in courses_data:  # Process all courses
        course_key = list(course_data.keys())[0]
        course_info = course_data[course_key]

        course_title = course_info['title']
        course_uuid = None

        # Search for the course UUID based on the course title
        courses = get_courses(course_title)
        if courses['results']:
            course_uuid = courses['results'][0]['uuid']

        if course_uuid:
            grade_distribution = get_course_grades(course_uuid)['cumulative']
            course_info['gradeDistribution'] = grade_distribution
        else:
            course_info['gradeDistribution'] = None

        result = {course_key: course_info}
        results.append(result)

    return results

# Load the cleaned JSON data
with open('s24_clean.json', 'r') as file:
    courses_data = json.load(file)

# Process the courses and merge grade distributions
output = process_courses(courses_data)

# Save the updated JSON data
with open('s24_clean_with_grades.json', 'w') as file:
    json.dump(output, file, indent=4)

print("Updated data saved to s24_clean_with_grades.json")