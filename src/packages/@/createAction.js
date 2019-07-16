export default function createAction(name, action) {
  return (...params) => {
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        `%c Action:%c ${name}`,
        `background: red; color: white`,
        `color: red`,
        params
      );
    }
    return action(...params);
  };
}
