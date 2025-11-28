const iconModules = import.meta.glob('@/assets/icons/*.{png,jpg,jpeg,svg}', { eager: true })
const imageModules = import.meta.glob('@/assets/images/*.{png,jpg,jpeg,svg}', { eager: true })
const illustrationModules = import.meta.glob('@/assets/illustrations/*.{png,jpg,jpeg,svg}', {
  eager: true,
})

const mapGlobToObject = (modules) => {
  const result = {}
  Object.entries(modules).forEach(([key, value]) => {
    const fileName = key.split('/').pop().split('.')[0]
    result[fileName] = value.default
  })
  return result
}

const con = {
  icons: mapGlobToObject(iconModules),
  images: mapGlobToObject(imageModules),
  illustrations: mapGlobToObject(illustrationModules),
}

export default con
