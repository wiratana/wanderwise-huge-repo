from firebase_functions import db_fn
from firebase_admin import initialize_app, db, credentials
from datetime import datetime
import os

# cred = credentials.Certificate(os.path.basename("credentials.json"))
# app = initialize_app(cred)
initialize_app()


#@db_fn.on_value_created(reference="/news/{city}/{category}/{news}", region="asia-southeast1")
@db_fn.on_value_created(reference="/news/{city}/{category}/{news}")
def notification_updater(event: db_fn.Event[db_fn.Change]) -> None:
    print(event.params["city"])
    print(event.data["title"])
    data = {
        "subject": " ".join([event.params["category"], "Alert!"]),
        "message": " ".join([event.data["title"], "... Read More!"]),
            "timestamp": datetime.timestamp(datetime.now()),
    }
    db.reference("notifications").child(event.params["city"]).push(data)


#@db_fn.on_value_written(reference="/news/{city}/{category}/{news}", region="asia-southeast1")
@db_fn.on_value_written(reference="/news/{city}/{category}/{news}")
def score_updater(event: db_fn.Event[db_fn.Change]) -> None:
    city_news = db.reference("news/{}".format(event.params["city"])).get()
    weights = db.reference("weights").get()

    data = {}
    total_case = 0
    for category_news in city_news.values():
        for news in category_news.values():
            date = datetime.strptime(news["date_published"], "%Y-%m-%d %H:%M:%S")
            if date.year == datetime.now().year:
                category = news["category"].lower().replace(" ", "_")
                if category not in data:
                    data[category] = 0

                data[category] += 1
                total_case += 1

    weighted_sum = 0
    for data_key in data:
        data_key = data_key.lower().replace(" ", "_")
        weighted_sum += data[data_key] * weights[data_key]

    safety_score = 100 - (weighted_sum / total_case) * 100

    score = {
        "score": safety_score,
        "datetime": str(datetime.now()),
        "description": "-"
    }

    db.reference("scores").child(event.params["city"]).push(score)
