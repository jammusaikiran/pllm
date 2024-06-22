import React from 'react'

const Page1 = () => {
  return (
    
        <div>
        <meta charSet="UTF-8" />
        <title>ucha</title>
        <div className="w3-container">
          <div className="w3-content w3-display-container w3-hide-small">
            <img className="slides" src="/lib/img/banner/banner-1.png" />
            <img className="slides" src="/lib/img/banner/banner-2.png" />
            <img className="slides" src="/lib/img/banner/banner-3.png" />
            <img className="slides" src="/lib/img/banner/banner-4.png" />
            <div className="w3-center" style={{width: '100%'}}>
              <span className="w3-button slider w3-small" onclick="currentDiv(1)">
                1
              </span>
              <span className="w3-button slider w3-small" onclick="currentDiv(2)">
                2
              </span>
              <span className="w3-button slider w3-small" onclick="currentDiv(3)">
                3
              </span>
              <span className="w3-button slider w3-small" onclick="currentDiv(4)">
                4
              </span>
            </div>
          </div>
          <div className="w3-panel w3-leftbar w3-light-gray">
            <a href="/">
              Home
            </a>
            →
            <a href="/LokSabha2024/">
              Lok Sabha 2024
            </a>
            →
            <a href="https://www.myneta.info/LokSabha2024/index.php?action=show_constituencies&state_id=2">
              ANDHRA PRADESH
            </a>
            →
            <b>
              AMALAPURAM (SC)
            </b>
          </div>
          <div className="w3-panel w3-leftbar w3-khaki">
            <h3>
              <h2>
                Lok Sabha 2024
              </h2>
            </h3>
          </div>
          <div className="w3-hide-small">
            <div className="w3-panel w3-leftbar w3-sand">
              <h3>
                Election Summary
              </h3>
            </div>
            <div className="w3-row">
              <div className="w3-half w3-container">
                <table className="w3-table w3-striped">
                  <tbody><tr>
                      <th valign="center">
                        HIGHLIGHTS OF CANDIDATES
                      </th>
                    </tr>
                    <tr>
                      <th>
                        Total number of constituencies analyzed
                      </th>
                      <th>
                        543
                      </th>
                    </tr>
                    <tr>
                      <td>
                        Total candidates analyzed by NEW
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=candidates_analyzed&sort=candidate#summary">
                            8338
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Candidates with declared criminal cases
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=crime&sort=candidate#summary">
                            1645(20%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Candidates with declared serious criminal cases
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=serious_crime&sort=candidate#summary">
                            1191(14%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Crorepati candidates
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=crorepati&sort=candidate#summary">
                            2573(31%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Candidates who are graduate or above
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=education&sort=candidate#summary">
                            4213 (51%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Candidates who have not declared PAN
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=without_pan&sort=candidate#summary">
                            264 (3%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Total women candidates
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=women_candidate&sort=candidate#summary">
                            797 (10%)
                          </a>
                        </b>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
              <div className="w3-half w3-container">
                <table className="w3-table w3-striped">
                  <tbody><tr>
                      <th>
                        HIGHLIGHTS OF WINNERS
                      </th>
                    </tr>
                    <tr>
                      <td>
                        Total winners analyzed by NEW
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=winner_analyzed&sort=candidate#summary">
                            543
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Winners with declared criminal cases
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=winner_crime&sort=candidate#summary">
                            251 (46%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Winners with declared serious criminal cases
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=winner_serious_crime&sort=candidate#summary">
                            170 (31%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Crorepati winners
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=winner_crorepati&sort=candidate#summary">
                            504 (93%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Winners who are graduate or above
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=winner_education&sort=candidate#summary">
                            420 (77%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Winners  who have not declared PAN
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=winner_without_pan&sort=candidate#summary">
                            0 (0%)
                          </a>
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Total women winners
                      </td>
                      <td>
                        <b>
                          <a href="index.php?action=summary&subAction=winner_women&sort=candidate#summary">
                            74 (14%)
                          </a>
                        </b>
                      </td>
                    </tr>
                  </tbody></table>
              </div>
            </div>
          </div>
          <div className="w3-panel w3-leftbar w3-sand">
            <h3>
              List of Candidates - AMALAPURAM (SC):ANDHRA PRADESH
              (
              <a href="comparisonchart.php?constituency_id=7" target="_blank">
                Comparison Chart of Party Candidates
              </a>
              )
            </h3>
          </div>
          <span style={{fontSize: '120%', color: 'red', backgroundColor: 'yellow'}}>
          </span>
          <br />
          <div className="w3-responsive">
            <table className="w3-table w3-bordered">
              <tbody><tr>
                  <th>
                    SNo
                  </th>
                  <th>
                    Candidate
                  </th>
                  <th>
                    Party
                  </th>
                  <th align="center">
                    Criminal Cases
                  </th>
                  <th>
                    Education
                  </th>
                  <th>
                    Age
                  </th>
                  <th align="right">
                    Total Assets
                  </th>
                  <th align="right">
                    Liabilities
                  </th>
                </tr>
                <tr>
                  <td>
                    2
                  </td>
                  <td>
                    <a href="candidate.php?candidate_id=5300">
                      G M Harish (Balayogi)
                    </a>
                    <b>
                      <font color="green" size={1}>
                        Winner
                      </font>
                    </b>
                  </td>
                  <td>
                    TDP
                  </td>
                  <td align="center" style={{}}>
                    0
                  </td>
                  <td>
                    Graduate Professional
                  </td>
                  <td>
                    33
                  </td>
                  <td align="right">
                    Rs 10,53,89,128
                    <br />
                    <span style={{color: 'black', fontSize: '70%', textDecoration: 'none', whiteSpace: 'nowrap'}}>
                      ~ 10 Crore+
                    </span>
                  </td>
                  <td align="right">
                    Rs 1,99,712
                    <br />
                    <span style={{color: 'black', fontSize: '70%', textDecoration: 'none', whiteSpace: 'nowrap'}}>
                      ~ 1 Lacs+
                    </span>
                  </td>
                </tr>
              </tbody></table>
          </div>
          <br />
          <br />
        </div>
      </div>

  )
}

export default Page1