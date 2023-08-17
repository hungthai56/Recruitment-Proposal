import moment from "moment";
import ReadMoreContent from "shared/components/common/read-more-content/ReadMoreContent";
import Constants from "utils/Constants";
import Utils from "utils/Utils";
import WaringPost from "shared/components/social/WaringPost/WaringPost";
import CodeTextLink from "shared/components/common/label/CodeTextLink";
import RouterPath from "router/RouterPath";

export const HeadCellPost = [
    {
        id: 'CreatedByName',
        numeric: '1',
        disablePadding: false,
        label: 'Người tạo',
        minWidth: 100,
        code: '1',
        field: 'CreatedByName',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        align: 'left',
        sort: false,
    },
    {
        id: 'Code',
        numeric: '1',
        disablePadding: false,
        minWidth: 130,
        label: 'Mã đề xuất',
        code: '2',
        field: 'Code',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        align: 'left',
        sort: false,
        component: (props) => {
            return (
                <CodeTextLink path={RouterPath.RECRUITMENT_PROPOSAL_DETAIL} Id={props.data?.Id} {...props} />
            );
        },
        unEnabled: true,
        isOnclick: true
    },
    {
        id: 'Title',
        numeric: '1',
        disablePadding: false,
        minWidth: 250,
        label: 'Tên đề xuất',
        code: '3',
        field: 'Title',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        align: 'left',
        sort: false,
    },
    {
        id: 'Status',
        numeric: '1',
        disablePadding: false,
        label: 'Trạng thái',
        minWidth: 150,
        code: '4',
        field: 'Status',
        type: Constants.TYPE_RENDER_TABLE.CHOOSE,
        align: 'center',
        component: (props) => {
            return <>{Utils.ConvertTypeStatus(props.children)}</>;
        },
        sort: false,
    },
    {
        id: 'Position',
        numeric: '1',
        disablePadding: false,
        minWidth: 250,
        label: 'Vị trí đề xuất',
        code: '4',
        field: 'Position',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        align: 'left',
        component: (props) => {
            return <>{Utils.ConvertTypePosition(props.children)}</>;
        },
        sort: false,
    },
    {
        id: 'WorkType',
        numeric: '1',
        disablePadding: false,
        minWidth: 200,
        label: 'Hình thức',
        code: '5',
        field: 'WorkType',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        component: (props) => {
            return <>{Utils.ConvertTypeWorkType(props.children)}</>;
        },
        align: 'left',
        sort: false,
    },

    {
        id: 'DateTo',
        numeric: '1',
        disablePadding: false,
        label: 'Hạn tuyển',
        minWidth: 100,
        code: '6',
        field: 'DateTo',
        type: Constants.TYPE_RENDER_TABLE.DATE,
        align: 'center',
        component: (props) => {
            return <>{moment(props.children).format('DD/MM/YYYY')}</>;
        },
        sort: false,
    },

    {
        id: 'WorkQuantityType',
        numeric: '1',
        disablePadding: false,
        minWidth: 100,
        label: 'Số lượng',
        code: '7',
        field: 'Quantity',
        type: Constants.TYPE_RENDER_TABLE.TEXT,
        align: 'right',
        sort: false,
    }
]