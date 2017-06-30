![react-hola](https://images.unsplash.com/photo-1489945052260-4f21c52268b9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=13d43906e3e3a60c9c7099f4e30b8d09)

# react-hola
simple react language translation

### Quick Start

```
npm install -save react-hola
```

#### Basic Usage

```javascript
import React from 'react';
import { InternationalProvider, WithTranslation } from 'react-hola';

//define language
const languagesData = {
  "en-US": {
    "main": {
      "title": "hello world",
      "greet": "hello {{ name }}"
    }
  }
}

//define a custom component
const helloWorld = props => (
  <div>
    <h2>{ props.langs.title }</h2>
    <p>{ props.langs.greet({ name: 'charlie'})}</p>
  </div>
)

//generate new component with HOC
const HelloWorld = WithTranslation(helloWorld, 'main')

//will output hello world and hello charlie
const App = () => (
  <InternationalProvider data={languagesData} locale="en-US">
    <HelloWorld />
  </InternationalProvider>
);
```

#### Component level translations

```javascript
import React from 'react';
import { InternationalProvider, WithTranslation } from 'react-hola';

//define language
const languagesData = {
  "en-US": {
    "main": {
      "helloWorld": {
        "title": "hello world",
        "greet": "hello {{ name }}"
      }
    }
  }
}

//define a custom component
const helloWorld = props => (
  <div>
    <h2>{ props.langs.title }</h2>
    <p>{ props.langs.greet({ name: 'charlie'})}</p>
  </div>
)

//access component translation using dot notation
const HelloWorld = WithTranslation(helloWorld, 'main.helloWorld')

//will output hello world and hello charlie
const App = () => (
  <InternationalProvider data={languagesData} locale="en-US">
    <HelloWorld />
  </InternationalProvider>
);
```

#### Share translation among component

```javascript
import React from 'react';
import { InternationalProvider, WithTranslation } from 'react-hola';

//define language
const languagesData = {
  "en-US": {
    "share": {
      "UI": {
        "title": "hello world"
      }
    }
    "main": {
      "helloWorld": {
        "greet": "hello {{ name }}"
      }
    }
  }
}

//define a custom component
const helloWorld = props => (
  <div>
    <h2>{ props.langs.title }</h2>
    <p>{ props.langs.greet({ name: 'charlie'})}</p>
  </div>
)

//access multiple component translation
const HelloWorld = WithTranslation(helloWorld, ['main.helloWorld', 'share,UI'])

//will output hello world and hello charlie
const App = () => (
  <InternationalProvider data={languagesData} locale="en-US">
    <HelloWorld />
  </InternationalProvider>
);
```
