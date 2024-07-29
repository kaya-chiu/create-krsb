import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

kintone.events.on('app.record.index.show', () => {
  const el = kintone.app.getHeaderSpaceElement()
  if (el) createApp(App).mount(el)
  console.log('project init')
})
