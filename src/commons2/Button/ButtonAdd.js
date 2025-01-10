import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
export const ButtonAdd = ({
    onClick = () => {},
    disabled = false,
    showText = false,
    size = "middle",
    block = false, // trường hợp nếu muốn button full width của parent
    isHide = false, // trường hợp nếu muốn ẩn button
    label = "Thêm mới",
}) => {
    return (
        <>
            <Button
                block={block}
                variant="solid"
                color="primary"
                size={size}
                onClick={onClick}
                loading={disabled}
                icon={<PlusOutlined />}
                hidden={isHide}
            >
                {showText && label}
            </Button>
        </>
    );
};
