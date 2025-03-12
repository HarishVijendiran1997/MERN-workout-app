//workout status in progress active dot animate styles
const workoutInProgressAnimateDotStyle = "dark:text-darkAddButtonHover ml-1 py-2 animate-bounce translate-y-1"
//workout status in progress active dot styles
const workoutInProgressActiveDot1Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-3 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"
const workoutInProgressActiveDot2Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-2 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"
const workoutInProgressActiveDot3Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-2 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"
const workoutInProgressActiveDot4Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-2 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"
const workoutInProgressActiveDot5Style = "border border-green-500 dark:border-darkAddButtonHover w-1 h-3 bg-green-500 dark:bg-darkAddButtonHover rounded-full overflow-hidden"

const InProgressLoader = () => (<div className="flex items-center justify-center ml-2">
    <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "200ms" }}>
        <div className={workoutInProgressActiveDot1Style}>
        </div>
    </span>
    <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "400ms" }}>
        <div className={workoutInProgressActiveDot2Style}>
        </div>
    </span>
    <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "600ms" }}>
        <div className={workoutInProgressActiveDot3Style}>
        </div>
    </span>
    <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "800ms" }}>
        <div className={workoutInProgressActiveDot4Style}>
        </div>
    </span>
    <span className={workoutInProgressAnimateDotStyle} style={{ animationDelay: "1000ms" }}>
        <div className={workoutInProgressActiveDot5Style}>
        </div>
    </span>
</div>)

export default InProgressLoader;