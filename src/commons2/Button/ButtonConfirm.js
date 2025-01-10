import { Button } from "antd";
import useIsMobile from "../../hooks/useIsMobile";
import i18n from "i18n-js";
import { CheckOutlined } from "@ant-design/icons";
export const ButtonConfirm = ({
    onClick = () => {},
    disabled = false,
    size = "middle",
    showText = false, // trường hợp nếu mobile muốn hiển thị text
    block = false, // trường hợp nếu muốn button full width của parent
    isHide = false, // trường hợp nếu muốn ẩn button
}) => {
    const isMobile = useIsMobile();
    return (
        <>
            <Button
                variant={"solid"}
                color="primary"
                size={size}
                onClick={onClick}
                loading={disabled}
                icon={<CheckOutlined />}
                block={block}
                hidden={isHide}
            >
                {(!isMobile || showText) && i18n.t("System.Confirm")}
            </Button>
        </>
    );
};
