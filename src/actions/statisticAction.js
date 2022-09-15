import React from 'react';
import {Modal, Progress} from "antd";
import {statisticsTitle} from "../utils/popupMessages";
import {useState} from "@types/react";
import {connect} from "react-redux";
import {updateItem} from "../slices/item-slice";

function StatisticAction(props) {
    const [isStatisticOpen, setIsStatisticOpen] = useState(false);
    const showStatistics = () => {
        setIsStatisticOpen(true);
    };

    const handleCancel = () => {
        setIsStatisticOpen(false);
    };
    const calculateRate = () => {
        const doneTask = props.items.filter(x => x.isCompleted === true)
        return doneTask.length / props.items.length * 100;
    }
    return (
        <Modal closable={false} centered title={statisticsTitle}
               okButtonProps={{style: {display: 'none'}}} cancelButtonProps={{style: {display: 'none'}}}
               open={isStatisticOpen} onCancel={handleCancel}>
            {
                props.items ?
                    <Progress style={{display: "flex", alignItems: 'center', justifyContent: 'center'}}
                              size={"small"} strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                    }} type="circle" percent={calculateRate()}/> : null
            }
        </Modal>
    );
}

const mapStateToProps = (state) => {
    return {
        items: state.item,
    };
};

export default connect(mapStateToProps, {updateItem})(StatisticAction);