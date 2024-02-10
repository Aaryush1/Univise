import requests
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
                    "undergraduateCatalogURI": item["subject"][
                        "undergraduateCatalogURI"
                    ],
                    "graduateCatalogURI": item["subject"]["graduateCatalogURI"],
                    "departmentURI": item["subject"]["departmentURI"],
                    "schoolCollegeURI": item["subject"]["schoolCollege"][
                        "schoolCollegeURI"
                    ],
                    "footnotes": item["subject"]["footnotes"],
                    "topics": item["topics"],
                    "lettersAndScienceCredits": item["lettersAndScienceCredits"],
                    "repeatability": item["repeatable"],
                }
            }
        )
    return subjects, filtered_data


def get_data(term="1244"):
    json_data = {
        "selectedTerm": term,
        "queryString": "*",
        "filters": [
            {
                "has_child": {
                    "type": "enrollmentPackage",
                    "query": {
                        "bool": {
                            "must": [
                                {
                                    "match": {
                                        "packageEnrollmentStatus.status": "OPEN WAITLISTED",
                                    },
                                },
                                {
                                    "match": {
                                        "published": True,
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        ],
        "page": 1,
        "pageSize": 5443,
        "sortOrder": "SCORE",
    }

    response = requests.post(
        "https://public.enroll.wisc.edu/api/search/v1",
        json=json_data,
    )
    return response

#TODO: Make lecture API calls for each course code and append to data
def get_timings(courses_list):
    pass

def save_data(path):
    response = get_data()
    subjects, courses = filter_json(response.json()["hits"])
    json.dump(courses, open(f"{path}.json", "w"), indent=4)
    json.dump(list(subjects), open(f"./{path}_subjects.json", "w"), indent=4)


save_data("data/s24_clean")
