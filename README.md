# CoderHunt

Web app that allows github users search work in projects published by other github users. Also, it helps project creators to find github users who worked previously withe the main language that is used in the project. Once an user and a project owner liked each other they will be connectede by chat.

## Deployment

You can find the web app here https://coderhunt.herokuapp.com. If you want to run locally the project you must follow the next steps.

#### Clone the repository
```
git clone https://github.com/ravelinx22/CoderHunt.git
```
#### Install dependencies
```
cd CoderHunt
meteor npm install
```
#### You need to create a file named settings.json with the next information.

```
{
	"CLIENT_ID": "---------------",
	"CLIENT_SECRET": "------------------",
	"AWSAccessKeyId": "--------------------",
	"AWSSecretAccessKey": "-----------------------"
}
```

#### Run the project
```
meteor --settings settings.json
```

The project runs in http://localhost:3000/

## Technologies

- Meteor
- React
- NPM
- HammerJS
- Amazon S3


## Authors
- William Ravelo Mendez **-ravelinx22**
- Nicolas Aguilar Leon **-naguilar12**

## License
MIT



