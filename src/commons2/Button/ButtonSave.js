import { Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import useIsMobile from "../../hooks/useIsMobile";
import i18n from "i18n-js";
export const ButtonSave = ({
    onClick = () => {},
    disabled = false,
    showText = false, // trường hợp nếu mobile muốn hiển thị text
    size = "middle",
    block = false, // trường hợp nếu muốn button full width của parent
    isHide = false, // trường hợp nếu muốn ẩn button
}) => {
    const isMobile = useIsMobile();
    return (
        <>
            <Button
                variant="solid"
                color="primary"
                size={size}
                onClick={onClick}
                loading={disabled}
                icon={<SaveOutlined />}
                block={block}
                hidden={isHide}
            >
                {(!isMobile || showText) && i18n.t("System.Save")}
            </Button>
        </>
    );
};
