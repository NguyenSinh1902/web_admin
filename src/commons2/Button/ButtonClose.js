import { Button } from "antd";
import i18n from "i18n-js";
import { CloseOutlined } from "@ant-design/icons";
import useIsMobile from "../../hooks/useIsMobile";
export const ButtonClose = ({
    onClick = () => {},
    disabled = false,
    size = "middle",
    block = false, // trường hợp nếu muốn button full width của parent
    showText = false, // trường hợp nếu mobile muốn hiển thị text
    isHide = false, // trường hợp nếu muốn ẩn button
}) => {
    const isMobile = useIsMobile();
    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                onClick={onClick}
                size={size}
                // disabled={disabled}
                loading={disabled}
                icon={<CloseOutlined />}
                block={block}
                hidden={isHide}
            >
                {(!isMobile || showText) && i18n.t("System.Close")}
            </Button>
        </>
    );
};
