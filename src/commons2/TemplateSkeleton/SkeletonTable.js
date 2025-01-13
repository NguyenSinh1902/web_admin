import { TableOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";

export const SkeletonTable = ({
    size = "default",
    tabs = false,
    paragraph = false,
    button = false,
    image = false,
    table = false,
}) => {
    return (
        <div className="flex flex-col w-full h-full gap-2">
            {tabs && (
                <div className="w-full">
                    <Skeleton.Node active size={size} className="!w-[70%] !h-[36px]" />
                </div>
            )}
            {table && (
                <div className="flex flex-col w-full h-full gap-2  flex-grow ">
                    <Skeleton.Input active size={size} block className="basis-auto" />
                    <Skeleton.Node active className="!w-full !flex-grow !h-full">
                        <TableOutlined
                            style={{
                                fontSize: 40,
                                color: "#bfbfbf",
                            }}
                        />
                    </Skeleton.Node>
                </div>
            )}
            {!tabs && !table && !paragraph && !button && !image && <Skeleton />}
        </div>
    );
};
