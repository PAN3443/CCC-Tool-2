import { useNavigate } from "react-router-dom";
import "../Style/CSS/filter.css";

function FNavigateButton(props) {
  let navigate = useNavigate();
  return (
    <div style={{...props.style, ...{cursor:"pointer", pointerEvents:"auto"}}}
      onClick={() => {
        if (props.navURL != null) {
          navigate(props.navURL);
        } else if (props.navExternURL != null) {
          window.open(props.navExternURL, "_blank");
        }
      }}
    >
      {props.children}
    </div>
  );
}

export default FNavigateButton;
