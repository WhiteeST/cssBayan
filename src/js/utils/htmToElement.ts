export default function (htmlString: string): ChildNode {
  const template = document.createElement('template');
  template.innerHTML = htmlString;
  return <ChildNode>template.content.firstChild;
}
