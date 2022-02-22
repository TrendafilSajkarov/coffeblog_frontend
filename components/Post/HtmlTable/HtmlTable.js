import PlainTable from "./PlainTable";
import StyledTable from "./StyledTable";

export default function HtmlTable(props) {
  if (props.node.display === "styled") return <StyledTable props={props} />;
  return <PlainTable props={props} />;
}
