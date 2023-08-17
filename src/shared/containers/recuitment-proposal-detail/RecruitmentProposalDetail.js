import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useRouterV2 from 'hooks/use-router-v2';
import styles from './RecruitmentProposalDetail.module.scss'
import CustomDetail from './../../components/recruitment-proposal-detail/CustomDetail'
import CustomFieldDetail from './../../components/recruitment-proposal-detail/CustomFieldDetail'
import { FooterManage } from 'shared/components/common/footer';
import ButtonCommon from 'shared/components/common/button/ButtonCommon';
import LoadingButton from 'shared/components/common/button-loading/ButtonLoading';
import RouterPath from 'router/RouterPath';
import action from './../../../redux/recruitment-proposal/action';
import moment from 'moment';
import Utils from "utils/Utils";
import ChangeStatusDetail from './../../components/recruitment-proposal-detail/ChangeStatusDetail'
import EventRegister, { EVENT_SHOW_POPUP } from 'utils/EventRegister';
import PopupName from 'shared/components/common/popup/PopupName';
import Constants from 'utils/Constants'

function RecruitmentProposalDetail(props) {
  const { ProposeId } = props
  const router = useRouterV2();
  const dispatch = useDispatch()
  const [canSubmit, setCanSubmit] = useState(true);
  const [item, setItem] = useState([])
  const [itemCheck, setItemCheck] = useState(false)
  const [statusChange, setstatusChange] = useState(10)
  
  const handleEdit = () => {
    router.push({ pathname: RouterPath.UPDATE_PROPOSAL.replace(":id", ProposeId) })
  }
  useEffect(() => {
    dispatch({
      type: action.GET_PROPOSE_DETAIL_START,
      payload: ProposeId ?? 0
    })
  }, [ProposeId])

  useEffect(() => {
    dispatch({
      type: action.FETCH_PROPOSED_MASTER,
      payload: {},
    });
  }, []);
  const proposeDetail = useSelector(state => state.AppReruitmentProposal?.ProposeDetail);
  const testla = useSelector(state => state.AppReruitmentProposal?.statusId);

  useEffect(() => {
    if (proposeDetail) {
      setItem(proposeDetail)
    } else {
      setItem([])
    }
  }, [proposeDetail], [testla?.Id])
  const ChangeStatus = (e) => {
    let params = {
      "Id": Number(ProposeId),
      "Status": String(e)
    }
    dispatch({
      type: action.CHANGE_STATUS_PROPOSE,
      payload: params,
      callback: (payload) => {
        setItemCheck(true)
        setCanSubmit(false)
        setstatusChange(payload.payload.Status)
      }
    })
  }
  const handleDeletePropose = (data) => {
    const message = "Bạn có chắc chắn muốn xoá dữ liệu này không ?"
    EventRegister.emit(EVENT_SHOW_POPUP, {
      type: PopupName.DELETE_POPUP,
      open: true,
      payload: {
        data: data,
        message,
        isLoading: true,
        callback: {
          success: (_props) => {
            const callback = () => {
              _props?.closeLoading()
              router.push({
                pathname: RouterPath.getRouteWithId(RouterPath.RECRUITMENTPRO)
              })
            };
            dispatch({
              type: action.DELETE_PROPOSED_LOCATION,
              payload: { callback, data: [data?.Id] },
              callback: (id) => {
                router.push({
                  pathname: RouterPath.getRouteWithId(RouterPath.RECRUITMENTPRO)
                })
              }
            });
          }
        }
      },
    });
  }
  let status = ''
  if (statusChange == 20) {status = <span style={{ color: "#008A5A", fontWeight: 600 }}>Duyệt</span>}
  if (statusChange == 10) {status = <span style={{ color: "#FF8246", fontWeight: 600 }}>Chờ duyệt</span>}
  if (statusChange == 30) {status = <span style={{ color: "#D72F2F", fontWeight: 600 }}>Không duyệt</span>}
  useEffect(() => {
    setstatusChange(item.Status)
    if (item.Status != Constants.STATUS_POST.STATUS_WAIT_APPROVE){
      setItemCheck(true)
      setCanSubmit(false)
    }else{
      setItemCheck(false)
      setCanSubmit(true)
    }
  },[item.Status])
  return (
    <>
      <div className={styles['recruitment__detail']}>
        <ChangeStatusDetail titleCheck='Duyệt' titleClose='Không duyệt' itemCheck={itemCheck} ChangeStatus={ChangeStatus} />
        <CustomDetail title='Thông tin chung'>
          <CustomFieldDetail textTitle='Mã đề xuất' valueForm={item.Code} />
          <CustomFieldDetail textTitle='Người tạo' valueForm={item.CreatedByName} />
          <CustomFieldDetail textTitle='Tên đề xuất' valueForm={item.Title} />
          <CustomFieldDetail textTitle='Hình thức làm việc' valueForm={item.WorkTypeName} />
          <CustomFieldDetail textTitle='Bộ phận đề xuất' valueForm={item.DepartmentName} />
          <CustomFieldDetail textTitle='Mức lương' valueForm={`${item.SalaryFrom} - ${item.SalaryTo}`} />
          <CustomFieldDetail textTitle='Vị trí đề xuất' valueForm={item.PositionName} />
          <CustomFieldDetail textTitle='Hạn tuyển' valueForm={moment(item.DateTo).format('DD/MM/YYYY')} />
          <CustomFieldDetail textTitle='Nơi làm việc' valueForm={item.BrancheNames} />
          <CustomFieldDetail textTitle='Số lượng tuyển' valueForm={item.Quantity} />
          <CustomFieldDetail textTitle='Lý do tuyển' valueForm={item.Reason} />
          <CustomFieldDetail textTitle='Trạng thái' valueForm={status} />
        </CustomDetail>
        <CustomDetail title='Yêu cầu ứng viên'>
          <CustomFieldDetail textTitle='Tuổi' valueForm={`${item.AgeFrom} - ${item.AgeTo}`} />
          <CustomFieldDetail textTitle='Trình độ' valueForm={item.LevelName} />
          <CustomFieldDetail textTitle='Giới tính' valueForm={item.GenderName} />
          <CustomFieldDetail textTitle='Chuyên ngành' valueForm={item.Specialized} />
          <CustomFieldDetail textTitle='Kinh nghiệm' valueForm={item.Experience == 1 ? 'Có kinh nghiệm' : 'Không có kinh nghiệm'} />
          <CustomFieldDetail textTitle='Ngoại ngữ' valueForm={item.ForeignLanguageName} />
        </CustomDetail>
        <CustomDetail title='Mô tả công việc'>
          <div className={styles['box__detail-view']}>
            <div>
              {item.Descriptions}
            </div>
          </div>
        </CustomDetail>
        <FooterManage titleBack={'Quay lại '} back={true}>
          <div className="d-flex justify-content-end align-items-center">
            <ButtonCommon
              // loading={isLoading}
              // disabled={!canSubmit}
              className='mr-3'
              type='button' onClick={() => handleDeletePropose(item)}
              typeColor='border-red'>
              Xóa
            </ButtonCommon>
            <LoadingButton
              // loading={isLoading}
              disabled={!canSubmit}
              type='button' onClick={() => handleEdit()}>
              Sửa
            </LoadingButton>
          </div>
        </FooterManage>
      </div>
    </>
  )
}
export default RecruitmentProposalDetail