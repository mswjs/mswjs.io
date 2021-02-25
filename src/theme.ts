export default {
  colors: {
    primary: 'hsl(16, 100%, 60%)',
    primaryDark: 'hsl(16, 16%, 20%)',
    primaryDim: 'hsla(16, 83%, 64%, 0.3)',
    secondary: 'hsl(210, 75%, 45%)',
    grayDim: 'hsl(210, 20%, 96%)',
    grayLight: 'hsl(210, 16%, 80%)',
    gray: 'hsl(210, 9%, 43%)',
    grayDark: 'hsl(210, 18%, 24%)',

    black: 'hsl(220, 25%, 12%)',
    success: 'hsl(90, 60%, 60%)',
    danger: 'hsl(0, 90%, 60%)',
  },
  utils: {
    alpha: (color: string, alpha: number) => {
      return color.replace(/hsl\((.+?)\)/, `hsla($1, ${alpha})`)
    },
  },
}
