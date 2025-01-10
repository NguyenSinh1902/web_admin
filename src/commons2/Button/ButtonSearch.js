import { Button } from "antd";
import i18n from "i18n-js";
import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import useIsMobile from "../../hooks/useIsMobile";
const ButtonSearchComp = ({
    onClick = () => {},
    disabled = false,
    showText = false,
    size = "middle",
    block = false, // trường hợp nếu muốn button full width của parent
    isHide = false, // trường hợp nếu muốn ẩn button
}) => {
    const isMobile = useIsMobile();
    return (
        <Button
            block={block}
            variant="solid"
            color="blue"
            size={size}
            onClick={onClick}
            disabled={disabled}
            icon={<SearchOutlined />}
            hidden={isHide}
        >
            {(!isMobile || showText) && i18n.t("System.Tìm kiếm")}
        </Button>
    );
};
export const ButtonSearch = React.memo(ButtonSearchComp);
