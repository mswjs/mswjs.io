export default {
  colors: {
    primary: 'hsl(28, 83%, 64%)',
    primaryDark: 'hsl(28, 16%, 20%)',
    secondary: 'hsl(210, 75%, 50%)',
    grayDim: 'hsl(210, 20%, 97%)',
    grayLight: 'hsl(210, 16%, 80%)',
    gray: 'hsl(210, 9%, 46%)',
    grayDark: 'hsl(210, 18%, 24%)',

    black: 'hsl(220, 25%, 20%)',
    danger: 'hsl(0, 90%, 60%)',
  },
  utils: {
    alpha: (color: string, alpha: number) => {
      return color.replace(/hsl\((.+?)\)/, `hsla($1, ${alpha})`)
    },
  },
}
