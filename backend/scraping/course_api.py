import requests
import json
import f23_cleaner

cookies = {
    "_hjSessionUser_1421853": "eyJpZCI6ImEwNzYwZmVkLWUwOTEtNWU1OS1hNjczLTg5ZDJjNDQxMzQ4YyIsImNyZWF0ZWQiOjE2NDM1ODU2MDc5NzksImV4aXN0aW5nIjp0cnVlfQ==",
    "_hjSessionUser_15573": "eyJpZCI6ImY4MDhhMTJmLTU1ODUtNWU1Mi05ZDYyLWQ1YTA4M2Y0MjBhYyIsImNyZWF0ZWQiOjE2NDQ3ODI5OTkxMTIsImV4aXN0aW5nIjp0cnVlfQ==",
    "fs_uid": "#S28S2#4896189972664320:5806860142563328:::#8d89844d#/1707501794",
    "_hjSessionUser_1354377": "eyJpZCI6ImM2YzEzNTNkLWU1YTYtNTAwYS1iYTBjLWQwZWRhNjA0OTRmNyIsImNyZWF0ZWQiOjE2ODI0NjQyMDk0OTYsImV4aXN0aW5nIjp0cnVlfQ==",
    "uw_madison_cookieconsent_timestamp": "1682464253",
    "_ga_CLJPG4TYB9": "GS1.1.1682809159.1.1.1682810195.60.0.0",
    "_ga_D48GGC808B": "GS1.1.1683129639.11.0.1683129639.0.0.0",
    "_scid": "0ae05ce1-1448-4bf5-91f7-f2c814ed930f",
    "_hjSessionUser_2963657": "eyJpZCI6ImUyZTBkNGZjLWZjYmQtNWIyOS1iNjY3LWU0NDhlZThkYTQyMSIsImNyZWF0ZWQiOjE2ODY4NzI0MzczNjAsImV4aXN0aW5nIjp0cnVlfQ==",
    "_sctr": "1%7C1686805200000",
    "_scid_r": "0ae05ce1-1448-4bf5-91f7-f2c814ed930f",
    "_uetvid": "0783f4800bd611ee9b28658ad5c68c15",
    "_ga_97T62X0QM2": "GS1.1.1686872543.3.0.1686872549.0.0.0",
    "_ga_WFHFK9BT2B": "GS1.1.1686872437.1.1.1686872554.0.0.0",
    "_hjid": "d9485eac-8d96-4700-8b85-6ba4af798acf",
    "_ga_1N45YZXFX9": "GS1.2.1696022484.1.0.1696022484.60.0.0",
    "_ga_PLJ9E3ZY82": "GS1.1.1696612956.1.0.1696614542.0.0.0",
    "_ga_W0LVWV6QC1": "GS1.1.1696612956.1.0.1696614542.0.0.0",
    "_ga_JPLCS6V1KC": "GS1.1.1697470446.2.1.1697471110.0.0.0",
    "_ga_GC7QPWWZQ9": "GS1.1.1698171040.1.0.1698171044.0.0.0",
    "_ga_XRDH2MV71X": "GS1.2.1698780071.25.0.1698780092.0.0.0",
    "_ga_492DKHNP76": "GS1.1.1698780071.27.0.1698780127.0.0.0",
    "_gid": "GA1.2.1463515685.1699316237",
    "_ga_DLYRV6N7SG": "GS1.2.1699316237.2.1.1699316903.0.0.0",
    "_clck": "187rdrk|2|fgi|0|1349",
    "_clsk": "qp24qm|1699389482696|3|1|x.clarity.ms/collect",
    "_ga_H765T3H239": "GS1.1.1699388944.49.1.1699389484.57.0.0",
    "_hp2_id.3001039959": "%7B%22userId%22%3A%221380355683315172%22%2C%22pageviewId%22%3A%223929581761916960%22%2C%22sessionId%22%3A%225063031243335753%22%2C%22identity%22%3A%22uu-2-7921c8f64b9bd665ec42a4b24dacae29a0f6ec0fbe64362eccef51d25ad59cb9-0oZnoj0EXwmozuvldCGvsOXhduumpWAJplTCVyht%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D",
    "_ga": "GA1.1.1008582667.1643583910",
    "_ga_BMXBQNSW2Q": "GS1.1.1699394453.7.0.1699394470.0.0.0",
    "AWSALB": "XP2ezEFAAkUb7Az2uODUtiKOgtHJmtyzx3J/FuMvvO0rtmZJIQyKmdj09XAcoX8JBbP5KJKFwm+KGYXImrOA9r5yLS5g3OnDRstz7p6wjepLQYMgZxZnU8ivUxaW",
    "AWSALBCORS": "XP2ezEFAAkUb7Az2uODUtiKOgtHJmtyzx3J/FuMvvO0rtmZJIQyKmdj09XAcoX8JBbP5KJKFwm+KGYXImrOA9r5yLS5g3OnDRstz7p6wjepLQYMgZxZnU8ivUxaW",
}

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    # 'Cookie': '_hjSessionUser_1421853=eyJpZCI6ImEwNzYwZmVkLWUwOTEtNWU1OS1hNjczLTg5ZDJjNDQxMzQ4YyIsImNyZWF0ZWQiOjE2NDM1ODU2MDc5NzksImV4aXN0aW5nIjp0cnVlfQ==; _hjSessionUser_15573=eyJpZCI6ImY4MDhhMTJmLTU1ODUtNWU1Mi05ZDYyLWQ1YTA4M2Y0MjBhYyIsImNyZWF0ZWQiOjE2NDQ3ODI5OTkxMTIsImV4aXN0aW5nIjp0cnVlfQ==; fs_uid=#S28S2#4896189972664320:5806860142563328:::#8d89844d#/1707501794; _hjSessionUser_1354377=eyJpZCI6ImM2YzEzNTNkLWU1YTYtNTAwYS1iYTBjLWQwZWRhNjA0OTRmNyIsImNyZWF0ZWQiOjE2ODI0NjQyMDk0OTYsImV4aXN0aW5nIjp0cnVlfQ==; uw_madison_cookieconsent_timestamp=1682464253; _ga_CLJPG4TYB9=GS1.1.1682809159.1.1.1682810195.60.0.0; _ga_D48GGC808B=GS1.1.1683129639.11.0.1683129639.0.0.0; _scid=0ae05ce1-1448-4bf5-91f7-f2c814ed930f; _hjSessionUser_2963657=eyJpZCI6ImUyZTBkNGZjLWZjYmQtNWIyOS1iNjY3LWU0NDhlZThkYTQyMSIsImNyZWF0ZWQiOjE2ODY4NzI0MzczNjAsImV4aXN0aW5nIjp0cnVlfQ==; _sctr=1%7C1686805200000; _scid_r=0ae05ce1-1448-4bf5-91f7-f2c814ed930f; _uetvid=0783f4800bd611ee9b28658ad5c68c15; _ga_97T62X0QM2=GS1.1.1686872543.3.0.1686872549.0.0.0; _ga_WFHFK9BT2B=GS1.1.1686872437.1.1.1686872554.0.0.0; _hjid=d9485eac-8d96-4700-8b85-6ba4af798acf; _ga_1N45YZXFX9=GS1.2.1696022484.1.0.1696022484.60.0.0; _ga_PLJ9E3ZY82=GS1.1.1696612956.1.0.1696614542.0.0.0; _ga_W0LVWV6QC1=GS1.1.1696612956.1.0.1696614542.0.0.0; _ga_JPLCS6V1KC=GS1.1.1697470446.2.1.1697471110.0.0.0; _ga_GC7QPWWZQ9=GS1.1.1698171040.1.0.1698171044.0.0.0; _ga_XRDH2MV71X=GS1.2.1698780071.25.0.1698780092.0.0.0; _ga_492DKHNP76=GS1.1.1698780071.27.0.1698780127.0.0.0; _gid=GA1.2.1463515685.1699316237; _ga_DLYRV6N7SG=GS1.2.1699316237.2.1.1699316903.0.0.0; _clck=187rdrk|2|fgi|0|1349; _clsk=qp24qm|1699389482696|3|1|x.clarity.ms/collect; _ga_H765T3H239=GS1.1.1699388944.49.1.1699389484.57.0.0; _hp2_id.3001039959=%7B%22userId%22%3A%221380355683315172%22%2C%22pageviewId%22%3A%223929581761916960%22%2C%22sessionId%22%3A%225063031243335753%22%2C%22identity%22%3A%22uu-2-7921c8f64b9bd665ec42a4b24dacae29a0f6ec0fbe64362eccef51d25ad59cb9-0oZnoj0EXwmozuvldCGvsOXhduumpWAJplTCVyht%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga=GA1.1.1008582667.1643583910; _ga_BMXBQNSW2Q=GS1.1.1699394453.7.0.1699394470.0.0.0; AWSALB=XP2ezEFAAkUb7Az2uODUtiKOgtHJmtyzx3J/FuMvvO0rtmZJIQyKmdj09XAcoX8JBbP5KJKFwm+KGYXImrOA9r5yLS5g3OnDRstz7p6wjepLQYMgZxZnU8ivUxaW; AWSALBCORS=XP2ezEFAAkUb7Az2uODUtiKOgtHJmtyzx3J/FuMvvO0rtmZJIQyKmdj09XAcoX8JBbP5KJKFwm+KGYXImrOA9r5yLS5g3OnDRstz7p6wjepLQYMgZxZnU8ivUxaW',
    "Origin": "https://public.enroll.wisc.edu",
    "Referer": "https://public.enroll.wisc.edu/search",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
}

json_data = {
    "selectedTerm": "1242",
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
    "pageSize": 4771,
    "sortOrder": "SCORE",
}

response = requests.post(
    "https://public.enroll.wisc.edu/api/search/v1",
    cookies=cookies,
    headers=headers,
    json=json_data,
)

json.dump(response.json(), open("../data/f23.json", "w"), indent=4)
