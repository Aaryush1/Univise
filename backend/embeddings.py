import os

API_KEY = ""
with open("./API_KEY.txt", "r") as f:
    API_KEY = f.read()
os.environ["OPENAI_API_KEY"] = API_KEY

from openai import Embedding
import json
import re


def create_embedding(text):
    response = Embedding.create(
        input=text,
        model="text-embedding-ada-002",
    )
    return response.data[0].embedding


def embed_dataset(dataset):
    embeddings = []
    for text in dataset:
        embeddings.append(create_embedding(text))
    return embeddings


# TODO: Parse courses from list of course text
def parse_courses(data):
    pattern = r"([A-Z/​]+ [0-9]+ — [A-Z ].+?)\n(\d+ credits\.\n.+?)(?=\n[A-Z/​]+ [0-9]+ — [A-Z ]|\Z)"
    for course in data:
        courses = re.findall(pattern, course, re.DOTALL)

        course_dict = {
            course.replace("\u200b", ""): description.strip()
            for course, description in courses
        }
    return course_dict


def parse_json(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        json_data = json.load(file)

    if type(json_data) is list:
        course_text = []
        for course in json_data:
            course_text.append(course.get("text"))
    else:
        course_text = [json_data.get("text")]

    return course_text


# TODO: Upload embeddings to Pinecone
def upload_embeddings(embeddings):
    pass


print(parse_courses(parse_json("./data/biology.json")))
