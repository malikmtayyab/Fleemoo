/* eslint-disable prefer-const */
/*eslint-disable*/
import React, { useState } from 'react';
import { Grid, CircularProgress, Card, CardContent, Typography, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Circle } from 'rc-progress';
import moment from 'moment';
import '../assets/css/fleemoo.css'
import { ReactComponent as SpeedLimitIcon } from '../resources/images/icon/speed-limit.svg';
import { useTranslation } from '../common/components/LocalizationProvider';

const useStyles = makeStyles((theme) => ({
    reportFooter: {
        textAlign: 'left',
        marginTop: '4px',
        padding: '8px 12px',
        background: '#F4F6F8',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        [theme.breakpoints.up('lg')]: {
            padding: '10px 15px',
        },
    },
    reportData: {
        fontFamily: 'SF Pro Display',
        fontSize: 12,
        lineHeight: '100%',
        color: '#000000',
        whiteSpace: 'nowrap',
        [theme.breakpoints.up('lg')]: {
            fontSize: 14,
        },
    },
    divalignedhorizontal: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    circle: {
        position: 'relative',
        width: '105px',
        marginTop: 13,
        minWidth: '80px',
        [theme.breakpoints.up('md')]: {
            width: '80px',
        },
        [theme.breakpoints.up('lg')]: {
            width: '105px',
        },
    },
    percent: {
        position: 'absolute',
        top: '30%',
        left: '47%',
        transform: 'translate(-30%,-47%)',
        fontSize: '24px',
        [theme.breakpoints.up('md')]: {
            top: '13%',
            left: '47%',
            transform: 'translate(-30%,-47%)',
        },
        [theme.breakpoints.up('lg')]: {
            top: '30%',
            left: '47%',
            transform: 'translate(-40%,-55%)',
        },
    },
    cardAvatar: {
        backgroundColor: 'rgb(48,181,3)',
    },
    reportCard: {
        background: '#fff',
        boxShadow: '0 0 rgba(0,0,0,0)',
    },
    cardSmallText: {
        lineHeight: '90%',
        textJustify: '',
        width: '130px',
        height: '30px',
        wordBreak: 'break-all',
        [theme.breakpoints.up('lg')]: {
            wordBreak: 'normal',
        },
    },
}));

const DashboardWidget = ({ overspeed, deviceWithOverpeedViolation, device, progress }) => {
    const classes = useStyles();
    const [nbrDeviceTotal, setNbrDeviceTotal] = useState(0);
    const t = useTranslation();


    let dateFrom;
    let dateTo;

    dateFrom = moment().subtract(7, 'days').startOf('day');
    dateTo = moment();

    let valueDescText =
        `${t('dashboardTimeFrameFrom')}: ${dateFrom.toString()} ${t('dashboardTimeFrameTo')}: ${dateTo.toString()}`;


    return (
        <div className="card-small">
            {progress ? (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        placeItems: 'center',
                    }}
                >
                    <CircularProgress style={{ color: '#0352DA' }} />
                </div>
            ) : (
                <>
                    <div className={classes.circle}>
                        <Circle
                            percent={
                                nbrDeviceTotal > 0
                                    ? (deviceWithOverpeedViolation / device) * 100
                                    : 0
                            }
                            trailWidth={9}
                            trailColor="#EDF4FB"
                            strokeWidth={9}
                            strokeLinecap="round"
                            strokeColor="#033CD3"
                        />
                        <h3 className={classes.percent}>
                            {device > 0
                                ? Math.round((deviceWithOverpeedViolation / device) * 100)
                                : 0}
                            %
                        </h3>
                    </div>
                    <div className="card-small-rowRight">
                        <Typography className={classes.cardSmallText}>
                            <span className="card-small-text">
                                {' '}
                                {t('sharedOverspeedRegistered')}
                            </span>
                        </Typography>
                        <div className={classes.divalignedhorizontal}>
                            <div>
                                <Tooltip title={valueDescText}>
                                    <span className="card-small-value">{overspeed}</span>
                                </Tooltip>
                            </div>
                            <div className="card-small-value">
                                <SpeedLimitIcon />
                            </div>
                        </div>
                        <div className={classes.reportFooter}>
                            <Typography className={classes.reportData} variant="caption">
                                {t('sharedDevicesAffected')}
                            </Typography>
                            <Typography
                                className={classes.reportData}
                                style={{ color: '#033CD3', fontWeight: 500, paddingLeft: 10 }}
                                variant="caption"
                            >
                                {deviceWithOverpeedViolation}
                            </Typography>
                        </div>
                    </div>
                </>
            )}
        </div>

    );
};

const ChartOverspeed = ({ overspeed, deviceWithOverpeedViolation, device, progress }) => {
    const classes = useStyles();
    return (
        <Card className={classes.reportCard}>
            <CardContent>
                <Grid container spacing={1} sx={{ justifyContent: 'space-between' }}>
                    <DashboardWidget
                        progress={progress}
                        overspeed={overspeed}
                        deviceWithOverpeedViolation={deviceWithOverpeedViolation}
                        device={device} />
                </Grid>
            </CardContent>
        </Card>
    );
};
/* eslint-enable */
export default ChartOverspeed;
