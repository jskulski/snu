(defproject gua "0.1.0-SNAPSHOT"
  :description "Check status of your third partys"
  :url "http://github.com/jskulski/gua"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [clj-http "3.1.0"]
                 [cheshire "5.6.1"]
                 [org.clojure/core.async "0.1.346.0-17112a-alpha"]]
  :main gua.core)

