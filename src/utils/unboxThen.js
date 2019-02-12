const unboxThen = handler => e => handler(e.target.value);
export default unboxThen;