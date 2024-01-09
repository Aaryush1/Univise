import json


def filter_json(data):
    filtered_data = []
    subjects = set()
    for item in data:
        subjects.add(item["subject"]["description"])
        filtered_data.append(
            {
                item["fullCourseDesignation"]: {
                    "courseName": item["courseDesignation"],
                    "title": item["title"],
                    "description": item["description"],
                    "school": item["subject"]["schoolCollege"]["shortDescription"],
                    "credits": item["creditRange"],
                    "generalEd": item["generalEd"],
                    "ethnicStudies": item["ethnicStudies"],
                    "breadths": item["breadths"],
                    "foreignLanguage": item["foreignLanguage"],
                    "honors": item["honors"],
                    "levels": item["levels"],
                    "openToFirstYear": item["openToFirstYear"],
                    "advisingPrerequisites": item["advisoryPrerequisites"],
                    "enrollmentPrerequisites": item["enrollmentPrerequisites"],
                }
            }
        )
    return subjects, filtered_data


test = get_json("./data/s24.json")
subjects, courses = filter_json(test)
print(courses[5])
