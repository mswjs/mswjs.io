export default {
  colors: {
    primary: 'hsl(27, 100%, 63%)',
    secondary: 'hsl(200, 75%, 50%)',
    grayDim: 'hsl(200, 16%, 92%)',
    grayLight: 'hsl(200, 16%, 80%)',
    gray: 'hsl(200, 12%, 24%)',
    grayDark: 'hsl(200, 12%, 16%)',

    danger: 'hsl(0, 90%, 60%)',
  },
  utils: {
    alpha: (color: string, alpha: number) => {
      return color.replace(/hsl\((.+?)\)/, `hsla($1, ${alpha})`)
    },
  },
}
