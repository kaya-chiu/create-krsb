import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

kintone.events.on('app.record.index.show', () => {
  const el = kintone.app.getHeaderSpaceElement()
  if (el) ReactDOM.createRoot(el).render(<App />)
  console.log('project init')
})
