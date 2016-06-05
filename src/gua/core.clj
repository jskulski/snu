(ns gua.core
  (:require [cheshire.core :as json]
            [clj-http.client :as client]
            [clojure.core.async
             :as a
             :refer [>! <! >!! <!! go chan buffer close! thread
                     alts! alts!! timeout]]))

;; 3rd party service parsing
(defstruct service :name :status-url)
(defn create-service [name status-url]
  (struct service name status-url))

(defstruct status :name :alert-level)
(defn create-status [name alert-level]
  (struct status name alert-level))

(def SERVICES [(create-service "Quay" "http://status.quay.io")
               (create-service "CircleCI" "http://circleci.statuspage.io")])

(defn get-service-status
  "Retrieve a status from a statuspage.io page"
  [service]
  (client/get (:status-url service) {:accept :json :as :json}))

(defn server-status->status
  "Parse status from a statuspage.io"
  [status]
  (create-status (:name (:page (:body status)))
                 (:indicator (:status (:body status)))))

(def retrieve-status (comp server-status->status get-service-status))

;; App
(defn run-app [SERVICES]
  (print (map retrieve-status SERVICES)))

(defn -main
  "Application entry point"
  [& args]
  (run-app SERVICES))

