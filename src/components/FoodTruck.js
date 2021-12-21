import React from "react";

const FooBar = ({cls, val}) => <div className={cls}>{val}</div>

const FoodTruck = () => (
  <>
    <FooBar cls={"food"} val={"Food"}/>
    <FooBar cls={"other"} val={"Other 1"}/>
    <FooBar cls={"truck"} val={"Truck"}/>
    <FooBar cls={"other"} val={"Other 2"}/>
    <FooBar cls={"food"} val={"Toast and eggs"}/>
  </>
)

export default FoodTruck