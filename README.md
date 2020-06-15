# Requirements

You must have installed NodeJs on your machine if not click [here](https://nodejs.org/en/download/) to download NodeJs

# Setup/Installation

```bash
cd INSTALLATION_PATH # directory path where you want to clone and also the directory where you will write solutions
git clone https://github.com/yteja555/codechef-bot.git # or u can download and extact the zip file
cd codechef-bot # move to the project directory
npm i
```

# Usage
u can get contest_code form <a href="https://www.codechef.com/contests">here</a>
```bash 
node index.js contest_code language
# language is optional by default cpp files are created (you can choose from cpp, java, python)
# please provide valid contest code
# for division based challenges specify 'a' or 'b' at the end of contestcode
# {a means division1} # {b means division2}
# example:- 
node index.js june20b python
# will create files for all the problems in that contest with predefined template
# if you want to change template change Template files in the project as you like
```
