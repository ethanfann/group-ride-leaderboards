
/*
Helper class for parsing Activity responses from Strava.
Creates objects for each metric and offers methods to return
the entries transformed with the respective athlete information
*/

class _Activity {
    constructor(activity, athlete) {

        //Ride Info
        this.id = activity.id;

        //Athlete Info
        this.athlete = {
            'name': athlete.name,
            'gender': athlete.gender,
            'picUrl': athlete.picUrl,
        };

        //Ride Data
        this.maxSpeed = {
            'value': activity.max_speed,
            'unit': "",
        };
        this.avgSpeed = {
            'value': activity.average_speed,
            'unit': "",
        };
        this.maxWatts = {
            'value': (activity.device_watts == true ? activity.max_watts : 0),
            'unit': "W"
        };
        this.avgWatts = {
            'value': (activity.device_watts == true ? activity.average_watts : 0),
            'unit': "W"
        };
        this.weightedAvgWatts = {
            'value': (activity.device_watts == true ? activity.max_watts : 0),
            'unit': "W"
        };
        this.maxHr = {
            'value': (activity.has_heartrate == true ? activity.max_heartrate : 0),
            'unit': "bpm"
        };
        this.avgHr = {
            'value': (activity.has_heartrate == true ? activity.average_heartrate : 0),
            'unit': "bpm"
        };
        this.kilojoules = {
            'value':(activity.hasOwnProperty("suffer_score") ? activity.suffer_score : 0),
            'unit': "kJ"
        };
        this.prCount = {
            'value': activity.pr_count,
            'unit': ""
        };
        this.avgCadence = {
            'value': (activity.hasOwnProperty("average_cadence") ? activity.average_cadence : 0),
            'unit': "rpm"
        };
        this.sufferScore = {
            'value': (activity.hasOwnProperty("suffer_score") ? activity.suffer_score : 0),
            'unit': ""
        };
        this.achievementCount = {
            'value': activity.achievement_count,
            'unit': ""
        };
        this.kudosCount = {
            'value': activity.kudos_count,
            'unit': ""
        };
    }
    transformEntry(value, unit){
        return {
            'name': this.athlete.name,
            'picUrl': this.athlete.picUrl,
            'gender': this.athlete.gender,
            'stravaUrl': "https://www.strava.com/activities/" + this.id,
            'value': value,
            'unit': unit,
        };
    }
    getMaxSpeed(unit){
        if(unit == "mph"){
            return this.transformEntry((this.maxSpeed.value * 2.23694).toFixed(1), unit);
        } else {
            return this.transformEntry((this.maxSpeed.value * 3.6).toFixed(1), unit);
        }
    }
    getAvgSpeed(unit){
        if(unit == "mph"){
            return this.transformEntry((this.avgSpeed.value * 2.23694).toFixed(1), unit);
        } else {
            return this.transformEntry((this.avgSpeed.value * 3.6).toFixed(1), unit);
        }
    }
    getMaxWatts(){
        return this.transformEntry(this.maxWatts.value, this.maxWatts.unit);
    }
    getAvgWatts(){
        return this.transformEntry(this.avgWatts.value, this.avgWatts.unit);
    }
    getWeightedAvgWatts(){
        return this.transformEntry(this.weightedAvgWatts.value, this.weightedAvgWatts.unit);
    }
    getMaxHr(){
        return this.transformEntry(this.maxHr.value, this.maxHr.unit);
    }
    getAvgHr(){
        return this.transformEntry(this.avgHr.value, this.avgHr.unit);
    }
    getKilojoules(){
        return this.transformEntry(this.kilojoules.value, this.kilojoules.unit);
    }
    getPrCount(){
        return this.transformEntry(this.prCount.value, this.prCount.unit);
    }
    getAvgCadence(){
        return this.transformEntry(this.avgCadence.value, this.avgCadence.unit);
    }
    getSufferScore(){
        return this.transformEntry(this.sufferScore.value, this.sufferScore.unit);
    }
    getAchievementCount(){
        return this.transformEntry(this.achievementCount.value, this.achievementCount.unit);
    }
    getKudosCount(){
        return this.transformEntry(this.kudosCount.value, this.kudosCount.unit);
    }
} Activity = _Activity; //Makes class Global
