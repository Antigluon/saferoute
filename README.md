# Saferoute

Many of us may take our ability to walk safely through our own neighborhood for granted. However, in many American cities, children whose only means of getting to school is on foot do not have the same luxury. Listening to a police scanner, we heard how often violent crime happens, especially in high-risk cities. Often, innocent bystanders are affected by this violence. Police get information through 911 calls, but this information only goes out over dispatch radio, which isn't useful for the average person who's just trying to walk home. We wanted to utilize this information source that could help keep bystanders safe from violent crime to help them avoid dangerous situations.

## What it does
Saferoute leverages live police radio chatter to locate and categorize crimes according to their severity in real-time. It then determines safe walking routes from one place to another that avoid these potentially dangerous incidents.

## How we built it
At any time of day, Saferoute is listening to police radio channels and rapidly transcribing their content. Next, our servers use natural language processing technologies along with a database of street names to pull out potential locations from the transcript along with textual descriptions of crimes taking place. A machine-learning algorithm trained on Chicago crime data then synthesizes the descriptions into a severity score, which indicates the potential risk for community members nearby. Our servers execute these algorithms constantly, keeping our database up to date. Our users may then simply tell Saferoute where they want to walk with our easy to use mobile app, and then Saferoute generates a safe but efficient path to get to the destination.

## Challenges we ran into
One issue we ran into was that the police radio chatter had a lot of interference and background noise. It was difficult to parse this out in order to get accurate transcriptions. Another task that was surprisingly hard was extracting addresses. We ended up using a combination of dependency parsing to get candidate locations, a database of street names to check if the candidates seemed valid, and then the google maps API to check if those locations were real places. Finally, setting up a dynamic map in the frontend that showed where crimes are happening as well as directing the user to safe locations was very difficult.

## What we learned
We learned how to deploy a scalable backend using Docker and Google App Engine along with other facets of the Google Cloud. In addition, we worked on user experience in react-native, implementing screen navigation/routing, API access, and web-views. We also learned how to extract important and unpredictable parameters from text; location in natural language is difficult, so we had to employ machine-learning based methods and natural language processing to obtain it in a machine-readable format.

## What's next for Saferoute
To expand Saferoute, we would use better radios (that decrease interference) so that we can get more clear recordings, and would expand it to more cities in the country. This is cheap: all we need is radios. In addition, we could hook directly into the 911 dispatch with police collaboration, which would dramatically increase the accuracy of automatic incident reporting, making people safer as they walk through the streets. Due to the scalable model Saferoute is built on, we can very easily expand the back-end infrastructure using Docker containers and flexible Google Cloud instances.

### Built With
google-app-engine, google-maps, javascript, mapquest, python, react-native, tensorflow
