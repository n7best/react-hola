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
