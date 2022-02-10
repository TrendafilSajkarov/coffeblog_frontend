import PlainTable from "./PlainTable";
import StyledTable from "./StyledTable";

export default (props) => {
  if (props.node.display === "styled") return <StyledTable props={props} />;
  return <PlainTable props={props} />;
};
