kintone.events.on('app.record.index.show', () => {
  const el = kintone.app.getHeaderSpaceElement()
  el.innerHTML = `
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  `
  console.log('project init')
})
