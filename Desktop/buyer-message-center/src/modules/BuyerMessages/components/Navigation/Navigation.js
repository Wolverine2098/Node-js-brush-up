import "./Navigation.css";
import React from "react";
export default function Navigation() {
  return (
    <div class="heading">
      <div class="f1">
        <div class="s1" id="s1">
          {" "}
          Messages &nbsp;
          <span id="contact_count" class="contact-count">
            (1062 contacts)
          </span>
        </div>
      </div>

      <div class="f2" id="cb-unrd-div">
        <span class="lbl_checkbox cb-unrd">
          <input type="checkbox" id="cb-unrd1">
            {/* <label for="cb-unrd" id = "cs12"></label> */}
          </input>
        </span>
        <span id="unread">Unread</span>
      </div>
    </div>
  );
}
