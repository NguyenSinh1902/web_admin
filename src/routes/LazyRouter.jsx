import { Suspense } from "react";
import { Loading } from "../Utils";

export const LazyRouter = (Component) => {
    return (
        <Suspense fallback={<Loading />}>
            <Component />
        </Suspense>
    );
};
