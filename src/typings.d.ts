/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*!text' {
  const content: string;
  export default content;
}

declare module 'text!*' {
  const content: string;
  export default content;
}

declare module 'json!*' {
  const value: any;
  export default value;
}

declare module 'raw-loader!*' {
  var _: string;
  export default _;
}

declare module 'raw-loader?lang=typescript!*' {
  var _: string;
  export default _;
}
