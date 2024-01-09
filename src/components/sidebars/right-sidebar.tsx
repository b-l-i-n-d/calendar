import { Icons } from "../icons";
import { Button } from "../ui/button/button";
import styles from "./sidebar.module.scss";

export const RightSidebar = () => {
    return (
        <div className={styles.rightSidebar}>
            <Button isIcon>
                <Icons name="bulb" size={20} />
            </Button>
            <Button isIcon>
                <Icons name="check-circle" size={20} />
            </Button>
            <Button isIcon>
                <Icons name="user-circle" size={20} />
            </Button>
            <Button isIcon>
                <Icons name="map-pin" size={20} />
            </Button>
        </div>
    );
};
