import os
import json
import pinecone

OPENAI_API_KEY = ""
with open("./OPENAI_API_KEY.txt", "r") as f:
    API_KEY = f.read()
os.environ["OPENAI_API_KEY"] = API_KEY

PINECONE_API_KEY = ""
with open("./PINECONE_API_KEY.txt", "r") as f:
    PINECONE_API_KEY = f.read()

pinecone.init(api_key=PINECONE_API_KEY, environment="us-west4-gcp-free")
index = pinecone.Index("courses-and-descriptions")

from openai import Embedding


def create_embedding(course: [str, str]):
    course[0] = course[0].replace("—", "-")
    response = Embedding.create(
        input=" ".join(course),
        model="text-embedding-ada-002",
    )
    print(course[0])
    return (course[0], response.data[0].embedding)


def embed_dataset(dataset):
    embeddings = []
    for text in dataset:
        embeddings.append(create_embedding(text))
    return embeddings


def parse_courses(data):
    course_data = []
    for courses in data:
        courses = courses.replace("\u200b", "")
        courses = courses.split("\n")
        for idx in range(0, len(courses), 3):
            course_data.append([courses[idx], " ".join(courses[idx + 1 : idx + 3])])
    return course_data


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


def upload_embeddings(index, embeddings):
    index.upsert(embeddings)


course_corpus = parse_json("../data/courses-and-descriptions.json")
course_list = parse_courses(course_corpus)


# Test string
# print(Embedding.create(input="Animal Sciences", model="text-embedding-ada-002",).data[0].embedding)

# embeddings = embed_dataset(course_list[:150])

# upload_embeddings(index, embeddings)
