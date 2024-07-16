
key="AIzaSyBEShS6L-BvBx0WZ78vg_qTO_aQ3z3pwlQ"
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI

llm = ChatGoogleGenerativeAI(model="gemini-pro-vision",google_api_key=key)
message = HumanMessage(
    content=[
        {
            "type": "text",
            # "text": "describe the name of the political party shown in the image,describe in detail about the party like the founder,ruled years in government",
            "text":"Part name,party founder,year of establishment, how many year it is in power,number of sitting legesltive members, number of parliamnt members,popolar schemes implemented,present minister from the party",
        },
        {"type": "image_url", "image_url": "bjp.png"},
    ]
)
result=llm.invoke([message])
print(result.content)