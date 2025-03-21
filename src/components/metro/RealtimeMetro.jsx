import { useState } from 'react';
import { APIfilters, metroOption, groupedByUpdnLine } from "../../filters/APIfilters";
import { MetroLineColor } from '../../filters/MetroLineColor';

export function RealtimeMetro({realtimemetroData}) {
    const [printRealtimemetroData , setPrintRealtiemMetroData] = useState([]); // 출력할 실시간 지하철 데이터
    const [isFilteredUpdn, setIsFilteredUpdn] = useState("");
    let groupRealtimeData = '';
    let metroupdnlineList = '';
    if (!realtimemetroData.message) { // 데이터가 안 넘어왔을시
      groupRealtimeData = groupedByUpdnLine(realtimemetroData); // 상하행 기준으로 배열에 key 값 부여
      metroupdnlineList = Object.keys(groupRealtimeData); // key 값 배열로
    }

    if (realtimemetroData.message) {
        return (
            <div>
                <h4><strong>{realtimemetroData.code} 에러 발생!</strong></h4>
                <br />
                <h4>{realtimemetroData.message}  {APIfilters[realtimemetroData.code]}</h4>
                <hr></hr>
            </div>
        );
    }
    const filterRealtimeData = (filter) => {
      if (metroupdnlineList.includes(filter))
        setPrintRealtiemMetroData(groupRealtimeData[filter]);
        setIsFilteredUpdn(filter)
    }

    return (
        <div>
          <div className="filter-button">
            {
              metroupdnlineList.map((updn) => (
                <h5
                  onClick={() => filterRealtimeData(updn)}
                  key={updn}
                  style={{
                    color: isFilteredUpdn === updn ? 'blue' : 'black',
                    fontWeight: isFilteredUpdn === updn ? 'bold' : 'normal', // fontWeight로 변경
                  }}
                >
                  {updn}
                </h5>
              ))
            }
          </div>
          <br />
          {
            (printRealtimemetroData.length ? printRealtimemetroData : realtimemetroData).map((metro, index) => {
              const metroLine = MetroLineColor.find(line => line.name === metroOption[metro.subwayId]); // 호선에 맞는 색이 있는지 찾기
              const metroLineColor = metroLine ? metroLine.color : "#000000"; // 호선에 맞는 색이 없으면 검은색으로
              return (
                <div className="row" key={index}>
                  <p style={{ fontSize: '0.8rem', color: 'gray' }}>* {metro.recptnDt} 기준</p>
                  {isFilteredUpdn === '' && <p style={{textDecoration: 'underline'}}><strong>{metro.updnLine}</strong></p> }   {/* 필터가 안되어 있을때만 상하행 출력 */}
                  <p>
                    <strong style={{color : metroLineColor}}>{metroOption[metro.subwayId]} </strong> {/* 호선에 따라 다른 색으로 */}
                    {metro.trainLineNm}
                  </p>
                  <p style={{ color: metro.btrainSttus !== '일반' ? 'red' : 'black' }}>
                    열차 종류 : {metro.btrainSttus}
                  </p>
                  <p>현재 위치 : <strong>{metro.arvlMsg2}</strong></p>
                  <strong style={{ color: 'red' }}>
                    {metro.lstcarAt === '1' && ' 막차'}
                  </strong>
                  <hr />
                </div>
              );
})
          }
        </div>
      );
}