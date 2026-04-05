# wanderwise-machine-learning

This is the repository for machine learning models development of Wanderwise app. Wanderwise is a safety travel app that could automatically summarize & classify news from various sources to users to provide safety information regarding tourist destinations.

The flow of development: 
1. Data collection & labeling

First, we scrap online indonesian news from detik news, then we translate these news and fed them to chat gpt api to label these data (getting the summary & classification label). The dataset is saved into a collection in mongodb.
<img src="https://github.com/wanderwise-id/wanderwise-machine-learning/blob/main/image.png"/>

2. Model building

Here, we use the fine-tuning approach to build both the text-summarization and the text-classification model. For the text summarization model, we fine tune the t5-small model. While for the text classification model, we fine tune the distill-bert model. 

* Text summarization architecture (T5-small):
<img src="https://github.com/wanderwise-id/wanderwise-machine-learning/blob/main/Screenshot%202023-12-22%20145121.png"/>

* Text classification architecture (Distill-bert):
<img src="Screenshot 2023-12-22 144550.png"/>

* Training result: text classification
<img src="Screenshot 2023-12-22 144925.png"/>
  
* Training result: text summarization
<img src="Screenshot 2023-12-22 144944.png"/>


3. Saving model

Then, after we're done training the models, we upload them to huggingface hub. 
<img src="Screenshot 2023-12-22 112001.png"/>
<img src="Screenshot 2023-12-22 112013.png"/>

