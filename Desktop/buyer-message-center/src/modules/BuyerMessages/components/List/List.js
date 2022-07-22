import "./List.css";

import { React, Component } from "react";
export default class ListComponent extends Component {
  constructor(props) {
    super(props);
  }

  contact_list = async () => {
    let params = {
      glusrid: "127253317",
      start: "1",
      end: "20",
      modid: "MY",
      AK: "eyJ0eXAiOiJKV1QiLCJhbGciOiJzaGEyNTYifQ.eyJpc3MiOiJVU0VSIiwiYXVkIjoiOCo5KjQqMCo3KiIsImV4cCI6MTY1NDc3MjkyOCwiaWF0IjoxNjU0Njg2NTI4LCJzdWIiOiIxMjcyNTMzMTciLCJjZHQiOiIwOC0wNi0yMDIyIn0.LOHvB0U8ZXUDXLrqb9g1k95SPjOUDnc7e-3fVKssK4U",
    };

    await this.props.fetchContactListData(params);
    if (this.props.MessagesReducer.Contactdata != undefined) {
      console.log(this.props.MessagesReducer.Contactdata);
    }
  };

  render() {
    return (
      <ul class="message-user-name-section" id="fetch_list">
        <li class="user-name1" id="0">
          <div class="no_cmp_logo">
            <span id="c1">A</span>
          </div>

          <div class="left_det_show">
            <div class="c-div">
              <p class="c_addr wrd_elip">
                {" "}
                <c_company>AK Gaming</c_company>, <c_city>Rupnagar</c_city>,{" "}
                <c_state>Punjab</c_state>
                <c_country></c_country>
              </p>
            </div>

            <div class="wrd_elip contname">
              <svg
                class="mr5 ml5"
                width="12px"
                height="12px"
                version="1.1"
                viewBox="0 -1 13 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>user (8)</title>
                <desc>Created with Sketch.</desc>
                <g fill="none" fill-rule="evenodd">
                  <g
                    transform="translate(-632 -218)"
                    fill-rule="nonzero"
                    stroke="#666"
                    stroke-width="1.3"
                  >
                    <g transform="translate(428 139)">
                      <g transform="translate(205 80)">
                        <path
                          id="a"
                          d="m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
                        />
                        <path d="m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span id="c_name">Apurv</span>
              <span id="c_number0" class="dib c_num">
                (08048372352,964)
              </span>{" "}
            </div>

            <p class="abscc">
              <span class="prd_icn_green"></span>
              <span class="prdct_dsply">High End Gaming Laptops</span>
            </p>

            <p class="last-msg-snippet wrd_elip ">
              I am interested in High End Gaming Laptops{" "}
            </p>

            {/* <div class="c-onln-div">
            <p class="lst-msg-date ">Yesterday</p>
            <i class="fa fa-circle c-onln-icn" id="online-104420814"></i>
            <p class="lst_contact_year" style="display:none">2022</p>
            <p class="init_flag" style="display:none">1</p>
        </div> */}
          </div>
        </li>

        <li class="user-name1" id="0">
          <div class="no_cmp_logo">
            <span id="c1">M</span>
          </div>

          <div class="left_det_show">
            <div class="c-div">
              <p class="c_addr wrd_elip">
                {" "}
                <c_company>Megha International</c_company>,{" "}
                <c_city>Mumbai</c_city>, <c_state>Maharashtra</c_state>
                <c_country></c_country>
              </p>
            </div>

            <div class="wrd_elip contname">
              <svg
                class="mr5 ml5"
                width="12px"
                height="12px"
                version="1.1"
                viewBox="0 -1 13 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>user (8)</title>
                <desc>Created with Sketch.</desc>
                <g fill="none" fill-rule="evenodd">
                  <g
                    transform="translate(-632 -218)"
                    fill-rule="nonzero"
                    stroke="#666"
                    stroke-width="1.3"
                  >
                    <g transform="translate(428 139)">
                      <g transform="translate(205 80)">
                        <path
                          id="a"
                          d="m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
                        />
                        <path d="m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span id="c_name">Devang Mehta</span>
              <span id="c_number0" class="dib c_num">
                (08048950550)
              </span>{" "}
            </div>

            <p class="abscc">
              <span class="prd_icn_green"></span>
              <span class="prdct_dsply">Dyestuff</span>
            </p>

            <p class="last-msg-snippet wrd_elip ">Quantity Required: 1 Kg </p>

            {/* <div class="c-onln-div">
            <p class="lst-msg-date ">Yesterday</p>
            <i class="fa fa-circle c-onln-icn" id="online-104420814"></i>
            <p class="lst_contact_year" style="display:none">2022</p>
            <p class="init_flag" style="display:none">1</p>
        </div> */}
          </div>
        </li>

        <li class="user-name1" id="0">
          <div class="no_cmp_logo">
            <span id="c1">M</span>
          </div>

          <div class="left_det_show">
            <div class="c-div">
              <p class="c_addr wrd_elip">
                {" "}
                <c_company>Megha International</c_company>,{" "}
                <c_city>Mumbai</c_city>, <c_state>Maharashtra</c_state>
                <c_country></c_country>
              </p>
            </div>

            <div class="wrd_elip contname">
              <svg
                class="mr5 ml5"
                width="12px"
                height="12px"
                version="1.1"
                viewBox="0 -1 13 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>user (8)</title>
                <desc>Created with Sketch.</desc>
                <g fill="none" fill-rule="evenodd">
                  <g
                    transform="translate(-632 -218)"
                    fill-rule="nonzero"
                    stroke="#666"
                    stroke-width="1.3"
                  >
                    <g transform="translate(428 139)">
                      <g transform="translate(205 80)">
                        <path
                          id="a"
                          d="m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
                        />
                        <path d="m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span id="c_name">Devang Mehta</span>
              <span id="c_number0" class="dib c_num">
                (08048950550)
              </span>{" "}
            </div>

            <p class="abscc">
              <span class="prd_icn_green"></span>
              <span class="prdct_dsply">Dyestuff</span>
            </p>

            <p class="last-msg-snippet wrd_elip ">Quantity Required: 1 Kg </p>

            {/* <div class="c-onln-div">
            <p class="lst-msg-date ">Yesterday</p>
            <i class="fa fa-circle c-onln-icn" id="online-104420814"></i>
            <p class="lst_contact_year" style="display:none">2022</p>
            <p class="init_flag" style="display:none">1</p>
        </div> */}
          </div>
        </li>

        <li class="user-name1" id="0">
          <div class="no_cmp_logo">
            <span id="c1">M</span>
          </div>

          <div class="left_det_show">
            <div class="c-div">
              <p class="c_addr wrd_elip">
                {" "}
                <c_company>Megha International</c_company>,{" "}
                <c_city>Mumbai</c_city>, <c_state>Maharashtra</c_state>
                <c_country></c_country>
              </p>
            </div>

            <div class="wrd_elip contname">
              <svg
                class="mr5 ml5"
                width="12px"
                height="12px"
                version="1.1"
                viewBox="0 -1 13 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>user (8)</title>
                <desc>Created with Sketch.</desc>
                <g fill="none" fill-rule="evenodd">
                  <g
                    transform="translate(-632 -218)"
                    fill-rule="nonzero"
                    stroke="#666"
                    stroke-width="1.3"
                  >
                    <g transform="translate(428 139)">
                      <g transform="translate(205 80)">
                        <path
                          id="a"
                          d="m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
                        />
                        <path d="m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span id="c_name">Devang Mehta</span>
              <span id="c_number0" class="dib c_num">
                (08048950550)
              </span>{" "}
            </div>

            <p class="abscc">
              <span class="prd_icn_green"></span>
              <span class="prdct_dsply">Dyestuff</span>
            </p>

            <p class="last-msg-snippet wrd_elip ">Quantity Required: 1 Kg </p>

            {/* <div class="c-onln-div">
            <p class="lst-msg-date ">Yesterday</p>
            <i class="fa fa-circle c-onln-icn" id="online-104420814"></i>
            <p class="lst_contact_year" style="display:none">2022</p>
            <p class="init_flag" style="display:none">1</p>
        </div> */}
          </div>
        </li>

        <li class="user-name1" id="0">
          <div class="no_cmp_logo">
            <span id="c1">M</span>
          </div>

          <div class="left_det_show">
            <div class="c-div">
              <p class="c_addr wrd_elip">
                {" "}
                <c_company>Megha International</c_company>,{" "}
                <c_city>Mumbai</c_city>, <c_state>Maharashtra</c_state>
                <c_country></c_country>
              </p>
            </div>

            <div class="wrd_elip contname">
              <svg
                class="mr5 ml5"
                width="12px"
                height="12px"
                version="1.1"
                viewBox="0 -1 13 15"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>user (8)</title>
                <desc>Created with Sketch.</desc>
                <g fill="none" fill-rule="evenodd">
                  <g
                    transform="translate(-632 -218)"
                    fill-rule="nonzero"
                    stroke="#666"
                    stroke-width="1.3"
                  >
                    <g transform="translate(428 139)">
                      <g transform="translate(205 80)">
                        <path
                          id="a"
                          d="m5.5 0c-1.8196 0-3.3 1.4804-3.3 3.3s1.4804 3.3 3.3 3.3 3.3-1.4804 3.3-3.3-1.4804-3.3-3.3-3.3z"
                        />
                        <path d="m6.5226 7.3578h-2.0452c-1.6916 0-3.361 0.78102-4.4774 2.4556v2.7021h11v-2.7021c-1.1147-1.6722-2.7837-2.4556-4.4774-2.4556z" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <span id="c_name">Devang Mehta</span>
              <span id="c_number0" class="dib c_num">
                (08048950550)
              </span>{" "}
            </div>

            <p class="abscc">
              <span class="prd_icn_green"></span>
              <span class="prdct_dsply">Dyestuff</span>
            </p>

            <p class="last-msg-snippet wrd_elip ">Quantity Required: 1 Kg </p>

            {/* <div class="c-onln-div">
            <p class="lst-msg-date ">Yesterday</p>
            <i class="fa fa-circle c-onln-icn" id="online-104420814"></i>
            <p class="lst_contact_year" style="display:none">2022</p>
            <p class="init_flag" style="display:none">1</p>
        </div> */}
          </div>
        </li>
      </ul>
    );
  }

  componentDidMount() {
    this.contact_list();
  }
}
