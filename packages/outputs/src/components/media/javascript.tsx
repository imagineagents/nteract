import React from "react";

interface Props {
  /**
   * The media type associated with our component.
   */
  mediaType: "text/javascript";
  /**
   * The JavaScript code that we would like to execute.
   */
  data: string;
};

export function runCodeHere(el: HTMLElement | null, code: string): any {
  if (!el) return;
  // Compatibility with Jupyter/notebook JS evaluation.  Set element so
  // the user has a handle on the context of the current output.
  const element = el;
  try {
    return eval(code); // eslint-disable-line no-eval
  } catch (err) {
    const pre = document.createElement("pre");
    pre.style.whiteSpace = "pre-wrap";
    if (err.stack) {
      pre.textContent = err.stack;
    } else {
      pre.textContent = err;
    }
    element.appendChild(pre);
    return err;
  }
}

export class JavaScript extends React.Component<Props> {
  el: HTMLElement | null = null;
  static defaultProps = {
    mediaType: "application/javascript",
    data: ""
  };

  componentDidMount(): void {
    runCodeHere(this.el, this.props.data);
  }

  shouldComponentUpdate(nextProps: Props): boolean {
    return nextProps.data !== this.props.data;
  }

  componentDidUpdate(): void {
    runCodeHere(this.el, this.props.data);
  }

  render() {
    return (
      <div
        ref={el => {
          this.el = el;
        }}
      />
    );
  }
}